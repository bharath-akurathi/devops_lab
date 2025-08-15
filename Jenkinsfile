pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/bharath-akurathi/devops_lab.git'
            }
        }

        stage('Run Server on Port 5001') {
            steps {
                sh '''
                # Kill any process using port 5001
                lsof -ti:5001 | xargs -r kill -9 || true

                # Start server directly from the repo folder
                nohup python3 -m http.server 5001 > server.log 2>&1 &
                echo "🚀 Server started at http://localhost:5001"
                '''
            }
        }
    }
}
