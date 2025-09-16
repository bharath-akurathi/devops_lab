pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          mkdir -p "$DEPLOY"
          cp -f 1/Event_registration.html "$DEPLOY"/Event_registration.html || true
        '''
      }
    }

    stage('Serve') {
      steps {
        sh '''
          DEPLOY="$HOME/devops_lab_site"
          FILE="$DEPLOY/Event_registration.html"

          
              open "$FILE" || true
            
        '''
      }
    }
  }
}
