### Changes necessary to get the app running

had to change path to tsconfig
had to upgrade angular/cli and angular/compiler-cli to v 11.2.5 to match other dependencies
change app component style path from scss to css

### Challenge Part 1.

Generated new character info component after reading how to in the Angular docs. Added a characters property, and moved the mat-card html and setStatusColor function and openDialog functionality into this new component. Decided to leave the character loading functionality in the app component, so the character-info component could be reused if a different set of characters ever wanted to be loaded.

### Challenge Part 2

A) Recreated the bug. Added console logs to determine the flow order of the character loading functionality, and from this figured I could add the applyFilter function to the search subscription event.

B) Recreated the bug. Reexamined logic flow, paying attention to the paging functionality. From this I figured I would need to remove the existing applyFilter function and add the filtering into the api call itself.

First I tried adding the status parameter into the existing searches, but I found this did not change when the status was updated, and remained at the value it was when it was set. I then determined I would need to change this status parameter to an observable. After doing so I was able to pass this value into the search and pagnation subscription events, and have it update after the page was initialised. I then added my own subscription event to call the api when the filter was changed.

### Challenge Part 3

First I checked the rick and morty api to see whether they had ordering implemented. They did not. At this point I was unsure if it would be possible to filter all the data, rather than just the visible data, as it is returned from the api already paginated. Unable to think of a way to deal with this without access to the API, I resolved to just sort the visible data for now.

I then looked at the material UI component library and added some buttons with a corresponding property and event. With this done, I added a simple switch with a couple array.sort methods to sort by the two categories. Finally, I added my orderResults method into the subscribe calls, so data would continue to be sorted when searching or filtering.

### Reflection

Upon completely the project, I was reminded the merits of looking for related bugs, as the solutions for one could end up also solving or erasing other bugs, as was the case with parts A and B in step 2. I think it also would have been prudent to spend a little more time looking at how the components (and the libraries used in them) were working to begin with, rather than jumping straight into coding and then having to change approaches as I figured out how different parts were working together. Overall was fun to give Angular a go and learn a bit about how it works, but I'm definitely still a React girl at heart.
