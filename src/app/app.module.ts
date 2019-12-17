import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClockService } from './clock.service';
import { ClockComponent } from './clock/clock.component';

/*
  Here we see a typescript decorator. A Decorator is a function that is executed right after defining an entry, and can
  modify the entry itself. In this case it adds metadata to the AppModule class constructor (the class itself is empty)
*/
@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ClockService],
  bootstrap: [AppComponent],
})
export class AppModule { }

/*
  Working with Angular you'll notice that many times you'll find declarative statements like this,
  that inform the Angular Compiler of a class declaration tree, and will let him load these declaration and make them
  available to use in dependency injection, where they can be requested by whomever needs them.

  An (Angular) module is a collection of such declaration that should be imported as a whole.
  You'll notice that a module has four fields:
  - declarations is a list of all the dynamic elements that are available for use in a HTML template:
    - component are UI widgets. They have a typescript ViewModel (the class named here) and an html/css template
      (named in the ViewModel decoration @Component)
    - pipes are simple transformation operation that can be used directly in templates with the | character to
      transform viewmodel values into strings
    - directives are a large class of object that include components and can extend the template language
      to do more complex magic.
  - provider is a list of binding for dependency injection that can be required explicitly from Typescript classes
    in their constructors. A generic injectable class is called "service" in Angular
  - imports is a list of other modules that the module being declared depends on. The declaration and providers named
    in them will also be available for use
  - bootstrap is a list of component used to create the initial app UI, that is that are needed to render index.html.
    Once created, the other components will be loaded when requested by the initial component itself based on the tags
    on its template.

*/
/**
 * Let's now move to the {@link app.component.ts} file by ctrl+clicking on the "AppComponent" identifier
 */
