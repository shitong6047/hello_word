pipeline {
  agent any
  parameters {
        string(name: 'tag_input', defaultValue: '', description: '部署的服务的镜像标签')
        booleanParam(name: 'deploy_k8s', defaultValue: true, description: '是否在Kubernetes集群发布')
    }
  stages {
    stage ('checkout'){
      steps{
        git branch: 'master', credentialsId: 'gitlab', url: 'ssh://git@gitlab.cd.xsio.cn:22222/huaxun/extmsgpush.git'
      }
    }
    stage('build frontend') {
      steps {
          	sh '''
                #bypass jenkins $HOME bug
                #export HOME=/opt/hudson
                . ${HOME}/.bashrc
                pwd
                #npm install
                npm install --registry=https://registry.npm.taobao.org
                npm run build
            '''
      }
    }
    stage ('def impage_path ') {
      steps {
          script {
          def gitURLcommand = 'git config --local remote.origin.url'
          tag = tag_input ?: GIT_COMMIT
          gitURL = sh(returnStdout: true, script: gitURLcommand).trim()
          repoName = gitURL.split('/')[-1].split('\\.')[0]
          def branch2env = [master: 'test', validation: 'validation', release: 'prod']
          IMAGE_PATH = "nexus-release.xsio.cn/${branch2env[env.BRANCH_NAME]}/${repoName}:${tag}"
          echo IMAGE_PATH
          IMAGE_PUB = "nexus-public.xsio.cn/${branch2env[env.BRANCH_NAME]}/${repoName}:${tag}"
          echo IMAGE_PUB
          }
      }
    }
    stage ('docker') {
      steps {
        sh """
            docker build -t ${IMAGE_PATH} .
            docker push ${IMAGE_PATH}
            docker rmi ${IMAGE_PATH} || echo
        """
      }
    }
    stage ('deploy'){
      steps {
        build job: "deploy_k8s_plugin/$env.BRANCH_NAME", parameters: [string(name: 'IMAGE_TAG', value: tag), string(name: 'SERVICE_NAMES', value: repoName)]
      }
    }
  }
}