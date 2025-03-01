import styles from './styles.module.css';

// language=Handlebars
export default `
<label class="${styles.input}
                {{#if theme-color}}${styles.themeColor}{{/if}}
                {{#if theme-blank}}${styles.themeBlank}{{/if}}
                {{#if theme-default}}${styles.themeDefault}{{/if}}">
    {{#if label}}<div class="${styles.label}">{{label}}</div>{{/if}}
    <input class="${styles.field}
                    {{#if icon}}${styles.withIcon}{{/if}}
                    {{#if rounded}}${styles.rounded}{{/if}}
                    {{#if align-right}}${styles.alignRight}{{/if}}"
        type="{{type}}"
        name="{{name}}"
        value="{{#if value}}{{value}}{{/if}}"
        placeholder=""
        {{#if required}}required{{/if}}
    />
    <span class="${styles.placeholder}
                {{#if placeholder-center}}${styles.placeholderCenter}{{/if}}
                {{#if placeholder-right}}${styles.placeholderRight}{{/if}}">
        {{#if icon}}<span class="${styles.icon}" data-icon="{{icon}}"></span>{{/if}}
        <span class="${styles.text}">
            {{placeholder}}
        </span>
    </span>
</label>
`;
