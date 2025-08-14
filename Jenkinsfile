pipeline {
    agent any

    // Prevent the declarative default checkout so we control branch explicitly
    options {
        skipDefaultCheckout()
    }

    // Make sure a NodeJS installation named "NodeJS" is configured in Jenkins (see notes)
    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                // Explicitly checkout main branch from your repo
                git branch: 'main', url: 'https://github.com/bharath-akurathi/devops_lab.git'
            }
        }

        stage('Validate HTML') {
            steps {
                sh '''
                echo "Ensure htmlhint is available..."
                # install htmlhint globally if missing
                if ! command -v htmlhint &> /dev/null; then
                  echo "htmlhint not found, installing..."
                  npm install -g htmlhint
                fi

                echo "Running htmlhint..."
                # run validation (fail the build if there are errors)
                htmlhint "**/*.html"
                '''
            }
        }

        stage('Deploy Locally (port 5001)') {
            steps {
                sh '''
                set -e
                DEPLOY_DIR="$HOME/devops_lab_site"
                echo "Preparing deploy dir: $DEPLOY_DIR"
                mkdir -p "$DEPLOY_DIR"

                # Sync workspace to deploy dir (exclude .git and node_modules)
                rsync -a --delete --exclude='.git' --exclude='node_modules' ./ "$DEPLOY_DIR"/

                # Stop any server on port 5001
                lsof -ti:5001 | xargs -r kill -9 || true

                # Start simple python HTTP server on port 5001
                cd "$DEPLOY_DIR"
                nohup python3 -m http.server 5001 > server.log 2>&1 &
                echo "Server started at http://localhost:5001"
                '''
            }
        }

        stage('Open in Browser') {
            steps {
                sh '''
                # give server a moment to start
                sleep 1
                TARGET="http://localhost:5001/Event_registration.html"
                echo "Opening ${TARGET}"
                if command -v open &> /dev/null; then
                    open "${TARGET}"
                elif command -v xdg-open &> /dev/null; then
                    xdg-open "${TARGET}"
                else
                    echo "No opener found; access the page manually: ${TARGET}"
                fi
                '''
            }
        }
    }

    post {
        failure {
            sh 'echo "Build failed — check console output for details."'
        }
        success {
            sh 'echo "Pipeline finished successfully."'
        }
    }
}
