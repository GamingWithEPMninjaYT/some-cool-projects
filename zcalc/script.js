document.querySelectorAll("BUTTON")[0].style.width = "350px";
document.querySelectorAll("BUTTON")[1].style.alignSelf = "flex-end";
document.querySelectorAll("BUTTON")[1].style.marginTop = "10px";
function cli(n) {
  
  let input = document.querySelectorAll("INPUT")[0];
  let btn = document.getElementById(n);
  let error = document.getElementById("error");
  if (btn.value == "=") {
    let res;
    try {
      res = eval(input.value);
      input.value = res;
    } catch (e) {
      error.innerHTML = e;
      error.style.color = "red";
      res = "";
    }
  } else if (btn.value == "c") {
    input.value = "";
  } else if (btn.value == "x") {
    input.value += "*";
  } else if (btn.value == "return") {
    let newStr = input.value.substring(0, input.value.length - 1);
    input.value = newStr;
    
  }else {
    input.value += btn.value;
  }
}
