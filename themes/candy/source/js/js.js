window.onload=function(){
  var s = skrollr.init();
  window.onscroll=function(){
    var top=document.getElementsByClassName('top')[0];
    if(window.scrollY>0){
      top.className='top hover';
    }
    else{
      top.className='top';
    }


  }
};

