jQuery(function( $ ){
    $('#topbar').localScroll({
        queue: true,
        duration: 1000,
        hash: true,
        offset: { top: -52 },
    });
    
    //Initialize and Configure Scroll Reveal Animation 
    window.sr = ScrollReveal();
    sr.reveal('.skill-icons', {
        duration: 2000,
        scale: 0.8,
        rotate: { x: 0, y: 0, z: 10 },
        distance: '10px'
    }, 50);

    $('.locator').on('click', function() {
        if ($('.qr-code-frame').is('.active')) {
            $('.qr-code-frame,.locator').removeClass('active');
        } else {
            $('.qr-code-frame,.locator').addClass('active');
        }
    })
});