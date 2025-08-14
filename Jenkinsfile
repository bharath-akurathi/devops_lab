pipeline {
    agent any

    stages {
        stage('Validate HTML') {
            steps {
                sh '''
                echo "Running HTML validation (docker fallback to npm)..."

                if command -v docker >/dev/null 2>&1; then
                  docker run --rm -v "$PWD":/app -w /app node:20 bash -lc "npm install -g htmlhint && htmlhint \\"**/*.html\\""
                elif command -v npm >/dev/null 2>&1; then
                  npm install -g htmlhint
                  htmlhint "**/*.html"
                else
                  echo "Skipping HTML validation — neither docker nor npm is available on this agent."
                fi
                '''
            }
        }

        stage('Deploy Locally (port 5001)') {
            steps {
                sh '''
                set -e
                DEPLOY_DIR="$HOME/devops_lab_site"
                mkdir -p "$DEPLOY_DIR"
                rsync -a --delete --exclude='.git' --exclude='node_modules' ./ "$DEPLOY_DIR"/

                # stop old server if any
                lsof -ti:5001 | xargs -r kill -9 || true

                cd "$DEPLOY_DIR"
                nohup python3 -m http.server 5001 > server.log 2>&1 &
                echo "Server started at http://localhost:5001"
                '''
            }
        }

        stage('Open in Browser') {
            steps {
                sh '''
                sleep 1
                TARGET="http://localhost:5001/Event_registration.html"
                echo "Opening ${TARGET}"
                if command -v open >/dev/null 2>&1; then
                    open "${TARGET}"
                elif command -v xdg-open >/dev/null 2>&1; then
                    xdg-open "${TARGET}"
                else
                    echo "No opener found; open ${TARGET} manually"
                fi
                '''
            }
        }
    }

    post {
        success { echo 'Pipeline finished successfully.' }
        failure { echo 'Pipeline failed — check console output.' }
    }
}
