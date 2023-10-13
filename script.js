
(function() {
  
  d3.xml('worldmap.svg').mimeType('image/svg+xml').get(function(error, xml) {
    document.querySelector('#svg').appendChild(xml.documentElement);

    d3.selectAll('path').each(function() {
      d3.select(this).attr('fill', '#ffce5d');
    });

    d3.selectAll('g').on('mouseover', function () {
      d3.selectAll('.hover').classed('hover', false);
      d3.selectAll('#' + this.id).classed('hover', true);
      

    });

    
    d3.selectAll('path').on('mouseover', function() {
      var countryId = this.id;

      // Check if the country is in the "countries" array
      const dep = countries.find((item) => item[0] === countryId)
      if (dep) {
        d3.selectAll('.hover').classed('hover', false);
        d3.selectAll('#' + countryId).classed('hover', true);
        var center = getcenter(countryId);
        var centerbase = getcenter(dep[1]);
        var svg = d3.select('svg');

        // Remove any existing line elements
        svg.selectAll('.hover-line').remove();

        // Define the circle's attributes and create the line element
        svg.append('path')
          .style('stroke', 'lightgreen')
          .style('stroke-width', 1)
          .style('fill', 'none')
          .attr('class', 'hover-line')
          .attr(
            'd',
            `M ${centerbase[0]},${centerbase[1]} Q ${(centerbase[0] + center[0]) / 2},${centerbase[1] - 100} ${center[0]},${center[1]}`
          );
          var tooltip = d3.select('#country-tooltip');
          var countryName = dep[0];
          var datetrip = dep[2];

          tooltip.style('display', 'block');
          tooltip.style('left', d3.event.pageX + 10 + 'px');
          tooltip.style('top', d3.event.pageY + 10 + 'px');
          d3.select('#country-name').text(countryName + ":" + datetrip);
      }
    });
    
    d3.selectAll('path').on('mouseout', function () {
      // Remove the line element when mouse leaves
      d3.select('svg').selectAll('.hover-line').remove();
      d3.select('#country-tooltip').style('display', 'none');
    });




    
    function getcenter(svgPath) {
      var element = document.getElementById(svgPath);
      var bbox = element.getBBox();
      
      var centerX = bbox.x + bbox.width / 2;
      var centerY = bbox.y + bbox.height / 2;
      
      return([centerX,centerY])
    }
    
    

    allCountries.forEach(function(country) {
      if (countriesE.includes(country) && countriesM.includes(country)) {
        // If the country is in both countriesE and countriesM, color it black
        d3.select('#' + country).style('fill', '#4BEBBA');
        d3.select('#' + country + ' path').style('fill', '#4BEBBA');
      } else {
        // If the country is not in both countriesE and countriesM, apply your existing logic
        if (countriesE.includes(country)) {
          d3.select('#' + country).style('fill', '#EB6ADF');
          d3.select('#' + country + ' path').style('fill', '#EB6ADF');
        }
        if (countriesM.includes(country)) {
          d3.select('#' + country).style('fill', '#4B85EB');
          d3.select('#' + country + ' path').style('fill', '#4B85EB');
        }
      }
    });


countries.map(function(country) {
  d3.select('#' + country[0]).style('fill', '#c0442c');
  d3.select('#' + country[0] + ' path').style('fill', '#c0442c');
  console.log(country)
  d3.select('#' + country[0]).on('click', function() {
    // Define the total number of images in the folder
    var totalImages = 3; // Replace 10 with the actual total number of images

    // Generate a random number to select a random image
    var randomImageIndex = Math.floor(Math.random() * totalImages) + 1;

    // Construct the image path based on the random number and the country
    var imagePath = country + '/' + randomImageIndex + '.jpg';

    // Create a hidden image element
    const img = new Image();
    img.src = imagePath;

    // Use the onload event to ensure the image is loaded before getting its dimensions
    img.onload = function() {
      const imageWindow = window.open(imagePath, '_blank', `width=${img.naturalWidth},height=${img.naturalHeight}`);
      if (imageWindow) {
        imageWindow.focus();
      }
    };
  });
});

  });
})();
