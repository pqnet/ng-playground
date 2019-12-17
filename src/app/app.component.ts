import { Component } from '@angular/core';

/**
 * This is the main component of the app. As you can see it has some metadata:
 *  - the 'selector' field is the name of the tag that identifies this component into the template:
 *    every time a tag <app-root></app-root> appears in a template, its inside will be rendered by this widget.
 *    Since this is the root component, you'll find one in the {@link ../index.html} file.
 *    Try to move it around, or add text before and after it to see what changes.
 *  - the 'templateUrl' field points to the file containing the HTML template for this widget.
 *    When you run 'ng serve' this annotation is read by the angular compiler,
 *    which then parses the html template and transforms it into a Javascript module, that is then included in the build
 *  - styleUrls is a list of stylesheets specific for this component. The whole app itself will also use
 *    the styles in the {@link ../styles.css} file
 *
 * The class itself is the viewmodel for this widget. At the moment it only has a public variable called "title".
 * Make it yours by adding a variable 'author' with your name, then move to the template file
 * by ctrl+clicking 'app.component.html'
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : [],
})
export class AppComponent {
  title = 'ng-playground';
  // Do not modify this comment, and everything after it
}
