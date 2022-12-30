var register = document.getElementById('register');
register.addEventListener('click', function() {
   var user_Password = document.getElementById('user_Password').value;
   var Password_Check = document.getElementById('Password_Check').value;
   if(user_Password.length < 7) {
       alert("비밀번호는 7자리 이상이어야 합니다.");
       return false;
   }
   if (user_Password != Password_Check) {
       alert("비밀번호가 일치하지 않습니다.");
       return false;
   } else {
       return true;
   }});