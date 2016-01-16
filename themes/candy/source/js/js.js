window.onload=function(){
  var s = skrollr.init();
  window.onscroll=function(){
    var top=document.getElementsByClassName('top')[0];
    var img1=document.getElementsByClassName('img1')[0];
    if(window.scrollY>0){
      top.className='top hover';
      img1.className='img1 hide';
    }
    else{
      top.className='top';
      img1.className='img1'
    }


  }
};

