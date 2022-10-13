let templateList = `{{#each this}}
  <li class ="country-list__item">
    <img src='{{flags.png}}' alt='{{name.common}}' width='75px' height="50px" class ="country-list__img rounded"/>
    <h2>{{name.common}}</h2>    
  </li>
{{/each}}`;

let countryInfo = `
<ul class='country-info__list'>
<li class='country-list__item'>
    <img src='{{flags.png}}' alt='{{name.common}}' width='75px' height="50px" class ="country-list__img rounded"/>
    <h2>{{name.common}}</h2>   
</li>
    <li class='country-info__item'><strong>Capital  : </strong>{{capital}}</li>
    <li class='country-info__item'><strong>Population : </strong> {{population}}</li>
    <li class='country-info__item'><strong>Languages : </strong>
        {{#each languages}}
          {{this}},
        {{/each}}
    </li>
</ul>
`;

export { templateList, countryInfo };
