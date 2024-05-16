$(document).ready(function() {
    $('#searchForm').submit(function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe y la página se recargue
  
      var superHeroId = $('#input').val().trim(); // Capturar el valor del input
      if (!superHeroId) {
        alert('Por favor ingresa un número de SuperHero válido');
        return;
      }
  
      var apiUrl = `https://www.superheroapi.com/api.php/4905856019427443/${superHeroId}`;
  
      $.ajax({
        type: 'GET',
        url: apiUrl,
        dataType: 'json',
        success: function(superHero) {
          console.log(superHero);
          
          $("#superHeroContainer").empty(); // Limpiar el contenedor antes de añadir nuevos datos
          $("#superHeroContainer").append(`
            <div class="card">
              <img src="${superHero.image.url}" alt="${superHero.name}">
              <h3>${superHero.name}</h3>
              <p>Nombre completo: ${superHero.biography['full-name']}</p>
              <p>Conexiones: ${superHero.connections['group-affiliation']}</p>
              <p>Publicado por: ${superHero.biography.publisher}</p>
              <p>Ocupación: ${superHero.work.occupation}</p>
              <p>Primera aparición: ${superHero.biography['first-appearance']}</p>
              <p>Altura: ${superHero.appearance.height}</p>
              <p>Peso: ${superHero.appearance.weight}</p>
              <p>Alianzas: ${superHero.biography.aliases}</p> 
            </div>
            <div id="chartContainer" style="height: 300px; width: 100%;">   
            </div>
          `);
          $('#superHeroContainer').show(); // Mostrar el contenedor
          var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2",
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Estadísticas de Poder para"+ ` ${superHero.name}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: superHero.powerstats.intelligence, label: "Intelligence" },
                    { y: superHero.powerstats.strength, label: "Strenght" },
                    { y: superHero.powerstats.speed, label: "Speed" },
                    { y: superHero.powerstats.durability, label: "Durability" },
                    { y: superHero.powerstats.power, label: "Power" },
                    { y: superHero.powerstats.combat, label: "Combat" },
                ]
            }]
        });
        chart.render();
        
        },

        error: function(error) {
          console.log(error);
          alert('Hubo un error al obtener los datos del superhéroe. Por favor, verifica el ID e intenta de nuevo.');
        }
      });
    });
  });
  