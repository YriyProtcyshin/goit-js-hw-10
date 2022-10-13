let templateList = `{{#each this}}
  <li>
    <img src='{{flags.png}}' alt='{{name.common}}' width='50' />
    {{name.common}}    
  </li>
{{/each}}`;

let countryInfo = `
<ul class='detail'>
    <li>Capital {{capital}}</li>
    <li>Population {{population}}</li>
    <li>Languages
        {{#each languages}}
          {{this}},
        {{/each}}
    </li>
</ul>
`;

export { templateList, countryInfo };
