



$(document).ready(function () {
    $('.qhead').on('click', function() {
        if($(this).hasClass('active')) {
          $(this).siblings('.ans-box').slideUp();
          $(this).removeClass('active');
        }
        else {
          $('.ans-box').slideUp();
          $('.qhead').removeClass('active');
          $('.acc-head').removeClass('active');
          $(this).siblings('.ans-box').slideToggle();
          $(this).toggleClass('active');
        }
    });  

    const $carousel = $('.anccarousel');
    const $leftArrow = $('.sleft');
    const $rightArrow = $('.sright');
    
    // Scroll amount: 200px for mobile, 400px for desktop
    const scrollAmount = $(window).width() <= 768 ? 200 : 400;
  
    // Function to update arrow states
    function updateArrows() {
      const scrollLeft = $carousel.scrollLeft();
      const scrollWidth = $carousel[0].scrollWidth - $carousel.width();
  
      if (scrollLeft <= 0) {
        $leftArrow.addClass('end');
      } else {
        $leftArrow.removeClass('end');
      }
  
      if (scrollLeft >= scrollWidth) {
        $rightArrow.addClass('end');
      } else {
        $rightArrow.removeClass('end');
      }
    }
  
    // Scroll left event
    $leftArrow.on('click', function () {
      $carousel.animate({ scrollLeft: '-=' + scrollAmount }, 300); // Smooth scroll
    });
  
    // Scroll right event
    $rightArrow.on('click', function () {
      $carousel.animate({ scrollLeft: '+=' + scrollAmount }, 300); // Smooth scroll
    });
  
    // Update arrows on scroll
    $carousel.on('scroll', updateArrows);
  
    // Initial arrow state check
    updateArrows();

    
    let isDragging = false; // Track dragging state
  let startX; // Starting X position of the mouse
  let scrollLeft; // Starting scroll position of the carousel

  $carousel.on('mousedown', function (e) {
    e.preventDefault(); // Prevent text selection and default behavior
    isDragging = true;
    startX = e.pageX - $carousel.offset().left;
    scrollLeft = $carousel.scrollLeft();
    $carousel.addClass('active'); // Add class for visual feedback (optional)
  });

  $(window).on('mousemove', function (e) {
    if (!isDragging) return; // Exit if not dragging
    e.preventDefault(); // Prevent default behavior while dragging
    const x = e.pageX - $carousel.offset().left;
    const walk = (x - startX) * 1; // Adjust multiplier for scroll speed
    $carousel.scrollLeft(scrollLeft - walk);
  });

  $(window).on('mouseup', function () {
    isDragging = false; // Stop dragging
    $carousel.removeClass('active');
  });

  $(window).on('mouseleave', function () {
    isDragging = false; // Stop dragging if cursor leaves window
  });

  // Prevent default dragging of items inside the carousel
  $carousel.find('*').on('dragstart', function (e) {
    e.preventDefault();
  });



  });
  















function switchLanguage(newLang) {
    const elements = document.querySelectorAll('[vi], [en]');
    const elementsimg = document.querySelectorAll('img');
    elements.forEach(element => {
        if (element.hasAttribute(newLang)) {
            element.innerHTML = element.getAttribute(newLang);
        }
    });
    elementsimg.forEach(element => {
        if (newLang === 'vi') {
            if (element.hasAttribute('viimg')) {
                element.src = element.getAttribute('viimg');
            }
        } else if (newLang === 'en') {
            if (element.hasAttribute('engimg')) {
                element.src = element.getAttribute('engimg');
            }
        }
    });
}
function detectAndApplyLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langToApply = browserLang.startsWith('vi') ? 'vi' : 'en';
    switchLanguage(langToApply);
}
document.querySelector('.langvie').addEventListener('click', () => switchLanguage('vi'));
document.querySelector('.langeng').addEventListener('click', () => switchLanguage('en'));
window.addEventListener('load', detectAndApplyLanguage);

