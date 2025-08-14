pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning the repository..."
                git branch: 'main', url: 'https://github.com/bharath-akurathi/devops_lab.git'
            }
        }

        stage('Validate HTML') {
            steps {
                sh '''
                echo "Validating HTML files..."
                
                # Add npm global bin to PATH for this shell only
                export PATH="$PATH:$(npm bin -g)"
                
                if ! command -v htmlhint &> /dev/null; then
                    echo "Installing HTMLHint..."
                    npm install -g htmlhint
                fi
                
                htmlhint "**/*.html" || true
                '''
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                echo "Deploying to local server..."
                DEPLOY_DIR="$HOME/devops_lab_site"
                mkdir -p "$DEPLOY_DIR"
                cp -r * "$DEPLOY_DIR"
                
                # Stop old server if running
                lsof -ti:5001 | xargs kill -9 || true

                # Start new server on port 5001
                cd "$DEPLOY_DIR"
                nohup python3 -m http.server 5001 > server.log 2>&1 &
                echo "Server started at http://localhost:5001"
                '''
            }
        }

        stage('Open in Browser') {
            steps {
                sh '''
                echo "Opening Event_registration.html in browser..."
                if command -v open &> /dev/null; then
                    open "http://localhost:5001/Event_registration.html"
                elif command -v xdg-open &> /dev/null; then
                    xdg-open "http://localhost:5001/Event_registration.html"
                fi
                '''
            }
        }
    }
}
