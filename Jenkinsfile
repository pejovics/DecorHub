pipeline {
    agent any
    tools {
        nodejs 'Default'
    }
    stages {
        stage('Checkout') {
            steps {
                // Korak za checkout repozitorijuma
                git url: 'https://github.com/pejovics/DecorHub.git', 
                branch: BRANCH_NAME, 
                // Dodajte opciju za ispisivanje debag informacija pozzzz
                changelog: true, 
                poll: true
            }
        }
       stage('Install dependencies') {
            steps {
                dir('./frontend') {
                    // Instalacija Angular zavisnosti
                    sh 'npm install'
                }

            }
        }
        stage('Build') {
            steps {
                dir('./frontend') {
                // Korak za izgradnju Angular projekta
                sh 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                dir('./frontend') {
                // Korak za pokretanje testova (opciono)
                // Ovo možete izostaviti ako nemate testove
                sh 'npm test'
                }
            }
        }
        // stage('Deploy') {
        //     steps {
        //    
        //         // Korak za deploy aplikacije (opciono)
        //         // Ovo možete izostaviti ako ne planirate deploy
        //         // Na primer, možete kopirati izgrađene fajlove na server
        //     }
        // }
    }

    post {
        //always {
            // Ovaj korak će se uvek izvršiti nakon svake faze
            // Na primer, ovde možete dodati korake za čišćenje ili oslobađanje resursa
        //}
        success {
            // Ovaj korak će se izvršiti samo ako je Pipeline uspešno završen
            // Na primer, ovde možete dodati korake za slanje notifikacija ili obaveštenja
            script {
                    mail bcc: '', 
                    body: "<b>Example</b><br>Project: ${env.JOB_NAME}  <br>Build Number: ${env.BUILD_NUMBER}  <br> URL de build: ${env.BUILD_URL} ",
                    cc: '',
                    charset: 'UTF-8',
                    from: '', mimeType: 'text/html',
                    replyTo: '',
                    subject: "SUCCESSFULL CI: Project name -> ${env.JOB_NAME}", 
                    to: "stefandejanpejovic@gmail.com";  
         
            }
        }
        failure {
            // Ovaj korak će se izvršiti samo ako je Pipeline neuspešno završen
            // Na primer, ovde možete dodati korake za slanje obaveštenja o grešci
            script {
                mail bcc: '', 
                    body: "<b>Example</b><br>Project: ${env.JOB_NAME}  <br>Build Number: ${env.BUILD_NUMBER}  <br> URL de build: ${env.BUILD_URL} ",
                    cc: '',
                    charset: 'UTF-8',
                    from: '', mimeType: 'text/html',
                    replyTo: '',
                    subject: "ERROR CI: Project name -> ${env.JOB_NAME}", 
                    to: "stefandejanpejovic@gmail.com";  
            }
        }
    }
}
