let test = `{{#each this}}
  <li>
    <img src='{{flags.png}}' alt='{{name.common}}' width='50' />
    {{name.common}}

    <ul class='detail'>
      <li>Capital {{capital}}</li>
      <li>Population {{population}}</li>
      <li>Languages
        {{#each languages}}
          {{this}},
        {{/each}}

      </li>
    </ul>
  </li>
{{/each}}`;

export { test };
