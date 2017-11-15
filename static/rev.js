  $(document).ready(function(){


  $('input:radio').on('change',function(){
  	console.log($(this))
    if ($(this).is(':checked')) {
    	var target = $(this).attr('target');
    	$('.'+target).css('display', 'block')
    	$('.'+target +' .question:not(.hidden)').css('display', 'block')
    } 
  });


  $('.q2_4').click(function(){
    if ($(this).is(':checked')) {
    	var target = $(this).attr('target');
    	$('.'+target).css('display', 'block')
    }
  });
  


  $('button').click(function(){
    	var target = $(this).attr('target');
    	console.log(target)
    	$('.'+target).css('display', 'block')
  });

  })