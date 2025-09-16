pipeline {
  agent any

  stages {
    stage('Build') {
        sh '''
            DEPLOY="$HOME/devops_lab_site"
          mkdir -p "$DEPLOY"
          cp -f 1/Event_registration.html "$DEPLOY"/Event_registration.html || true
        '''
    }
      
    stage('Serve') {
      steps {
        sh '''
          open "$DEPLOY/Event_registration.html"
          echo "open Event_registration.html manually"
        '''
      }
    }
  }
}
