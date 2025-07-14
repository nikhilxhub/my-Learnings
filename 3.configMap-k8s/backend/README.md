# backend

docker build --platform=linux/amd64 -t nikhilummidi/configmap-testing:1 .

docker push  nikhilummidi/configmap-testing:1

k apply -f cmp.yml

kubectl apply -f deployment.yml

kubectl get pods

kubectl logs -f config-testing-5895978c67-d8x89

kubectl describe pod config-testing-5895978c67-d8x89


kubectl get pods

kubectl rollout restart deployment config-testing

NAME                             READY   STATUS        RESTARTS   AGE
config-testing-cbdc8d97f-tmwkv   1/1     Terminating   0          8m18s
config-testing-f9b587dcf-ctz8h   1/1     Running       0          54s

kubectl logs -f config-testing-f9b587dcf-ctz8h

Hello via Bun!
3000
undefined