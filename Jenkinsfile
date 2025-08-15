pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/bharath-akurathi/devops_lab.git'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                DEPLOY_DIR="$HOME/devops_demo"
                mkdir -p "$DEPLOY_DIR"
                cp -r . "$DEPLOY_DIR"

                # Stop any server on port 5001
                # lsof -ti:5001 | xargs -r kill -9 || true

                cd "$DEPLOY_DIR"
                nohup python3 -m http.server 5001 > server.log 2>&1 &
                echo "🚀 Site deployed at http://localhost:5001"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}