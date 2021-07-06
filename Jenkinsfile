// Jenkinsfile

pipeline {
  agent {
    kubernetes {
      // this label will be the prefix of the generated pod's name
      label 'jenkins-agent-my-app'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    component: ci
spec:
  containers:
    - name: kubectl
      image: lachlanevenson/k8s-kubectl:v1.20.7 # use a version that matches your K8s version
      command:
        - cat
      tty: true
"""
    }
  }

  stages {
    stage('Build') {
      steps {
		  sh "sudo docker build -t localhost:32000/frontend:latest ."
		  sh "sudo docker push localhost:32000/frontend:latest"
      }
    }

    stage('Deploy') {
      steps {
        container('kubectl') {
          sh "kubectl delete -f ./kubernetes/deployment.yaml"
          sh "kubectl apply -f ./kubernetes/deployment.yaml"
          sh "kubectl apply -f ./kubernetes/service.yaml"
        }
      }
    }
  }
}