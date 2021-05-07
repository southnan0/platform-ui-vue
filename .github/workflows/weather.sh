- name: 'Send mail'
  uses: dawidd6/action-send-mail@master
  with:
    serveraddress: smtp.163.com
    serverport: 465
    username: ${{ secrets.MAILUSERNAME }}
    password: ${{ secrets.MAILPASSWORD }}
    subject: Shanghai Weather Report
    body: file://result.html
    to: yifeng.ruan@gmail.com
    from: GitHub Actions
    content_type: text/html