document.addEventListener('DOMContentLoaded', function () {
    fetch('../json/skills_data.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');

            data.forEach(skill => {
                // Create the wrapper div for each skill
                const wrapperDiv = document.createElement('div');
                wrapperDiv.classList.add('svg-wrapper');
                wrapperDiv.setAttribute('data-id', skill.id);
                wrapperDiv.setAttribute('data-custom', 'false');

                // Create the SVG element
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100");
                svg.setAttribute("height", "100");
                svg.setAttribute("viewBox", "0 0 100 100");

                // Create the hexagon (polygon)
                const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                polygon.setAttribute("points", "50,5 95,27.5 95,78.5 50,95 5,72.5 5,27.5");
                polygon.classList.add("hexagon");
                svg.appendChild(polygon);

                // Create the text element
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", "50%");
                text.setAttribute("y", "25%");
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("fill", "black");
                text.setAttribute("font-size", "7");

                // Split the skill text into lines and create <tspan> elements
                skill.text.split('\n').forEach((line, index) => {
                    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    tspan.setAttribute("x", "50%");
                    tspan.setAttribute("dy", index === 0 ? "0" : "1.2em");
                    tspan.setAttribute("font-weight", "bold");
                    tspan.textContent = line.trim();
                    text.appendChild(tspan);
                });
                svg.appendChild(text);

                // Create the image element and adjust position
                const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
                image.setAttribute("x", "35%");
                image.setAttribute("y", "55%");
                image.setAttribute("width", "30");
                image.setAttribute("height", "30");
                image.setAttributeNS("http://www.w3.org/1999/xlink", "href", 'icons/' + skill.icon.split('/').pop());
                svg.appendChild(image);

                // Append the SVG to the wrapper div
                wrapperDiv.appendChild(svg);

                // Add interactivity: click event to toggle selected state
                wrapperDiv.addEventListener('click', function () {
                    wrapperDiv.classList.toggle('selected');
                });

                // Append the wrapper div to the container
                skillsContainer.appendChild(wrapperDiv);
            });
        })
        .catch(error => {
            console.error('Error loading the JSON data:', error);
        });
})