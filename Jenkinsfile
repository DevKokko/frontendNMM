// Jenkinsfile
pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        echo "building..."
        sh "docker build -t localhost:32000/frontend:latest ."
        sh "docker push localhost:32000/frontend:latest"
      }
    }

    stage('Deploy') {
      steps {
        echo "deploying..."
        sh "kubectl delete -f ./kubernetes/deployment.yaml"
        sh "kubectl apply -f ./kubernetes/deployment.yaml"
        sh "kubectl apply -f ./kubernetes/service.yaml"
      }
    }
  }
}
/*pipeline {
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
    - name: docker
      image: docker
      command:
        - cat
      tty: true
      volumeMounts:
        - mountPath: /var/run/docker.sock
          name: docker-sock
    - name: kubectl
      image: lachlanevenson/k8s-kubectl:v1.20.7 # use a version that matches your K8s version
      command:
        - cat
      tty: true
  volumes:
    - name: docker-sock
      hostPath:
        path: /var/run/docker.sock
"""
    }
  }

  stages {
    stage('Build') {
      steps {
        container('docker') {
          sh "sudo docker build -t localhost:32000/frontend:latest ."
          sh "sudo docker push localhost:32000/frontend:latest"
        }
      }
    }

    stage('Deploy') {
      steps {
        container('kubectl') {
          sh "sudo kubectl delete -f ./kubernetes/deployment.yaml"
          sh "sudo kubectl apply -f ./kubernetes/deployment.yaml"
          sh "sudo kubectl apply -f ./kubernetes/service.yaml"
        }
      }
    }
  }
}*/