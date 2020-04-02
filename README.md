# Carbon Project

* Generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.
* Using Carbon Design System.

## Dev

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Icon Usage (IBM Carbon)

Explore icons here: https://www.carbondesignsystem.com/guidelines/icons/library

Icons in this package support the following sizes: `16`, `20`, `24`, and `32`
pixels. These sizes refer to the width and height of the icon. To reduce bundle
sizes each icon is exported as it's own module, you can use an icon component in
your project by doing the following:

In your module:

```ts
import { AddModule } from '@carbon/icons-angular';

@NgModule({
  // ...
  imports: [
    // ...
    AddModule,
    // ...
  ],
  // ...
})
export class MyModule {}
```

In your component template:

```html
<!-- ... -->
<!-- the directive should be preferd whenever possible -->
<svg ibmIconAdd size="32"></svg>
<!-- but a component is also available -->
<ibm-icon-add size="32"></ibm-icon-add>
<!-- ... -->
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Testing

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
