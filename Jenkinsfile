pipeline {
    agent any

    stages {
        stage('Validate HTML') {
            steps {
                sh 'htmlhint "**/*.html" || true'
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                    DEPLOY_DIR="$HOME/devops_lab_site"
                    mkdir -p "$DEPLOY_DIR"
                    cp -r * "$DEPLOY_DIR"
                    cd "$DEPLOY_DIR"
                    nohup python3 -m http.server 8080 &
                '''
            }
        }
    }
}
