# Deployment Guide

This guide provides instructions for deploying the Opportunities Database Africa application.

## Prerequisites

- Docker
- Kubernetes cluster
- kubectl configured with your cluster
- Supabase account and project
- Container registry (e.g., Docker Hub, Google Container Registry)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/opportunities-database-africa.git
   cd opportunities-database-africa
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both root and backend directories
   - Update the variables with your values

3. Start local development:
   ```bash
   docker-compose up
   ```

## Production Deployment

1. Set up Supabase:
   - Create a new project in Supabase
   - Run the SQL commands in `supabase/schema.sql`
   - Get your project URL and anon key

2. Configure Kubernetes secrets:
   ```bash
   # Base64 encode your secrets
   echo -n "your-supabase-url" | base64
   echo -n "your-supabase-anon-key" | base64
   echo -n "your-jwt-secret" | base64
   echo -n "your-grafana-admin-password" | base64

   # Update k8s/secrets.yaml with the encoded values
   ```

3. Build and push Docker images:
   ```bash
   # Update the registry URL in deploy.sh
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. Verify deployment:
   ```bash
   kubectl get pods
   kubectl get services
   ```

## Monitoring and Logging

### Prometheus & Grafana

1. Access Grafana:
   ```bash
   kubectl port-forward svc/grafana 3000:80 -n monitoring
   ```
   Then visit http://localhost:3000 (default credentials: admin/admin)

2. Import dashboards:
   - Node Exporter Dashboard (ID: 1860)
   - Kubernetes Cluster Monitoring (ID: 7249)
   - Application Metrics Dashboard (ID: 12856)

3. Configure alerts:
   ```yaml
   # Example alert rule
   groups:
   - name: application_alerts
     rules:
     - alert: HighErrorRate
       expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
       for: 5m
       labels:
         severity: critical
       annotations:
         summary: High error rate detected
         description: Error rate is above 10% for 5 minutes
   ```

### ELK Stack

1. Access Kibana:
   ```bash
   kubectl port-forward svc/kibana 5601:5601 -n logging
   ```
   Then visit http://localhost:5601

2. Configure index patterns:
   - Create index pattern for "filebeat-*"
   - Set time field to "@timestamp"

3. Create dashboards:
   - Application Logs Dashboard
   - Error Rate Dashboard
   - User Activity Dashboard

4. Set up log retention:
   ```yaml
   # Example ILM policy
   PUT _ilm/policy/logs_policy
   {
     "policy": {
       "phases": {
         "hot": {
           "min_age": "0ms",
           "actions": {
             "rollover": {
               "max_size": "50gb",
               "max_age": "7d"
             }
           }
         },
         "delete": {
           "min_age": "30d",
           "actions": {
             "delete": {}
           }
         }
       }
     }
   }
   ```

## Maintenance and Operations

1. View logs:
   ```bash
   # Application logs
   kubectl logs -f deployment/opportunities-frontend
   kubectl logs -f deployment/opportunities-backend

   # Monitoring logs
   kubectl logs -f deployment/prometheus -n monitoring
   kubectl logs -f deployment/grafana -n monitoring

   # Logging logs
   kubectl logs -f deployment/kibana -n logging
   kubectl logs -f daemonset/filebeat -n logging
   ```

2. Scale deployments:
   ```bash
   kubectl scale deployment opportunities-frontend --replicas=3
   kubectl scale deployment opportunities-backend --replicas=3
   ```

3. Update application:
   ```bash
   # Update the image tag in k8s/*.yaml
   kubectl apply -f k8s/
   ```

## Troubleshooting

1. Check pod status:
   ```bash
   kubectl describe pod <pod-name>
   ```

2. Check service status:
   ```bash
   kubectl describe service <service-name>
   ```

3. View logs:
   ```bash
   kubectl logs <pod-name>
   ```

4. Common issues:
   - Prometheus targets not being scraped:
     ```bash
     kubectl port-forward svc/prometheus 9090:9090 -n monitoring
     # Visit http://localhost:9090/targets
     ```
   - Elasticsearch health:
     ```bash
     kubectl exec -it elasticsearch-0 -n logging -- curl -s http://localhost:9200/_cluster/health
     ```
   - Filebeat status:
     ```bash
     kubectl exec -it $(kubectl get pod -l app=filebeat -o jsonpath='{.items[0].metadata.name}') -n logging -- filebeat status
     ```

## Backup and Recovery

1. Database backup:
   ```bash
   # Backup Supabase database
   pg_dump -h your-supabase-host -U postgres -d opportunities_db > backup.sql
   ```

2. Restore database:
   ```bash
   # Restore Supabase database
   psql -h your-supabase-host -U postgres -d opportunities_db < backup.sql
   ```

3. Monitoring data backup:
   ```bash
   # Backup Prometheus data
   kubectl exec -it $(kubectl get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}') -n monitoring -- tar -czf /tmp/prometheus-backup.tar.gz /prometheus/
   kubectl cp monitoring/$(kubectl get pod -l app=prometheus -o jsonpath='{.items[0].metadata.name}'):/tmp/prometheus-backup.tar.gz ./prometheus-backup.tar.gz
   ```

4. Logs backup:
   ```bash
   # Backup Elasticsearch indices
   kubectl exec -it elasticsearch-0 -n logging -- elasticsearch-dump --input=http://localhost:9200/filebeat-* --output=/tmp/backup.json
   kubectl cp logging/elasticsearch-0:/tmp/backup.json ./elasticsearch-backup.json
   ```

## Security Considerations

1. Keep secrets secure:
   - Never commit secrets to version control
   - Use Kubernetes secrets for sensitive data
   - Rotate secrets regularly

2. Network security:
   - Use HTTPS for all external traffic
   - Configure CORS properly
   - Implement rate limiting

3. Access control:
   - Use RBAC for Kubernetes resources
   - Implement proper authentication and authorization
   - Regular security audits

4. Monitoring security:
   - Secure Prometheus endpoints
   - Restrict Grafana access
   - Encrypt Elasticsearch data
   - Monitor access to logging systems 