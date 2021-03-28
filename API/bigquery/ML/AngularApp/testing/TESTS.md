# UNIT TESTS


## website.ts
* make sure next is only used if there is room to spare on the previous line

# E2E TESTS 

Make sure you can visit the webpage
Make sure the responsiveness is working 
Make sure them components dont overflow
Make sure panel borders realign properly on all mediaqueries


## Nesting

* refer to  [here](C:\Users\oluod\My_Notebook\Google\API\bigquery\AngularApp\testing\e2e)
* make sure that elements can go inside one another
* make sure that elements get added and removed in their flex container
* make sure  add/remove button outside the flex container can contain whats going on inside the flex container
* make sure on adding subtracting, functionality is preseved,
* ablility to add non copied elements to the dom
* things work in tandem
* formmatting for multipleGroup top leve zChild and nested might not be supported, avoid having nested and top level in the same multipleGroup

* for nesting to work the directive is placed on the body as the management system
* there is a group, name and suffix, type is for the body which means it the only directive that fires
* make sure elements go to the correct group
* we have a suffix for the final name in case there are duplicates caused by an event such as delta node or others events. the suffix is used to help the nest directive identify which elements belong to which,
	* the end developer can also specify a suffix if they desire to manipulate how nest directive nest items

* with overflow issues, set to 
	visible,
	scroll when using flexbox so the container doesnt break
	*avoid this will break the format
		none,hidden

## Duplicates

* MAJOR UPDATE, use overlayFix in stack, when you cant modify the keep by anything the browsers knows, such as the possible position in desktop mode, here when the app goes to desktop will determine which elements should be stacked after by seeing an overlap, determine which is the is the topmost on the previous line the next elements should follow and fix accordingly


* the component.hook is a Set
	* make sure mobile and desktop hooks are fired before saying add done, but fire once
	* make sure on add and remove component hooks are properly reset
* when the add and remove button are on the same line as the items to duplicates, the items to be moved dont know how to react properly this can be seen from movingKeep in desktop mediaQuery fix this
* only supports, when the add/remove buttons are not on the same line as the target 
	* we insert between last item that have 0 and first item that has 1
	* the items that get duplicated are the items that have 0
	* the top for each item that has only 0 is the top from the first item that has 1
	* items with  and 1 get replaced according to the mapping
	* items with 0 and 1 get replaced according
* on add one line group elements get duplicated and positioned properly
* on multi line group elements get duplicated properly
* on one line group around buttons elements get duplicated properly

works with items on same line

before contols  with items before 
after controls  with items before     
|position|one line|multi line|
|:------|:------:|------:|
|before contols                                                            |         |       |            |
|around controls                                                           |         |       |            |
|after controls                                                            |         |       |            |
|before contols  with items before                                         |         |       |            |
|around controls    with items before                                      |         |       |            |
|after controls  with items before                                         |         |       |            |
|before contols  with items after                                          |         |       |            |
|around controls with items after                                          |         |       |            |
|after controls  with items after                                          |         |       |            |
|before controls with items in betwewen                                    |         |       |            |
|after controls with items in betwewen                                     |         |       |            |
|around controls with items in betwewen top                                |         |       |            |
|around controls with items in betwewen bottom                             |         |       |            |
|around controls with items in betwewen both                               |         |       |            |
|before controls with items in betwewen and before                         |         |       |            |
|before controls with items in betwewen and after                          |         |       |            |
|after controls with items in betwewen and before                          |         |       |            |
|after controls with items in betwewen and after                           |         |       |            |


duplicates with nesting

|a|b|c|
|:------|:------:|------:|
|2 or more deltas in same component inner            |         |       |            |
|2 or more deltas in same component outer            |         |       |            |
|2 or more deltas in same component in or out        |         |       |            |
* might just do random to table out the first table is exhausting

controls
|a|b|c|
|:------|:------:|------:|
|controls are not coupled standalone and can control from anywhere in the app  |         |       |            |
|several controls for an add/remove action  |         |       |            |
|disable buttons if pressed to quickly to prevent corruption|||
|hooks moved to "remove done" if there are no more elements to remove


duplicates with groups
|a|b|c|
|:------|:------:|------:|
|when we duplicate groups is there a uniqueness to indicate each duplicated group so they are not conflicting  |         |       |            |


removal 
|a|b|c|
|:------|:------:|------:|
|make sure the componentObject and zChild dont get ruined |         |       |            |
|for add remove button make sure increment is modified properly |         |       |            |
|make sure things are working|||



## Latching 
* dropdown is considered latching 
* latching is any extension of a DOM element which requires the use of another DOM element

quantity enum
* 3 - static DOM element
* 2 - duplicated DOM element
* 1 - dynamic DOM element
* 4 - DOM element latched onto a main DOM element


### Dropdown

- test that the select value is above the other options when open [DONE]
- test that when you click an option, 
	- the select element get updated
	- the dropdown closes
- test that when you click the select option
	- options are displayed below as needed
	- there are no gaps between the options,
	- the options are the same with 
	- on toggle click the dropdown folds and reappears
- test with other elements
	- if the dropdown is open, its at the front most of the screen none of the elements are covering it
		- solution have a directive on the board/body that deals with z-index issues
	- when dealing with other components, it goes over the other components to display as needed

#### Nested dropdown
* to get it to work we wrap the dropdown in a div, give the div class += "container", set its container.appNest.name, to dropdown.appNest.name, & same for under set dropdown.appNest.under to container.appNest.name and set  
```
container.appNest.name,under = dropdown.appNest.name,under
dropdown.appNest.name += "DropDown"
dropdown.appNest.under = container.appNest.name

```
*  when names are same, works if there are no other dropdown with the same name
*  works when all the names are different
* think how to make it work with duplicate

* on align-content when the container is too small and flex-flow:row-wrap , the design seems to break sending elements far above further than the top, find the cause

- test that all elements part of the dropdown are in the required container

#### duplicate dropdown 

- test that on duplication, the options are copied to the respective dropdowns
- test the functionality works on the duplicates




## Directives
* if there is more than one topLevel zChild invovled, the logic must be managed from the board/body , for instance were you have a camera feature or chat feature, you must keep the data assoicated with the correct features 
	* you will require a group, name and naming system (preferrable suffix in nest directive), to uniquely idenitfy all element in the group as well as types as needed say if it was a facebook stream, google stream ... to deal with the different data expressing the same feature


## Components 

__ISSUE__ - on overlapFix if a top was specified we get a infinite loop when duplication is involved, figure out the issue,
__ISSUE__ - zChild.type === "img" if height is specifed as css on top level angular still manages to change to 0 

### Component sizing
* make sure you can size the component as needed

### Componnent position

* test that you can achieve the holy grail
* provide options whether media queries should be ignored

### top level and formatting
* by default judima will format all top level zChildren in its components
* provide a flag, to ignore top level, this means that the elemnts might end up going in the div board
* provide a flag indicating the zChild should not get considered in formatting
* if a zChild is not top level it doesn't get formatted as of now, in the future the board will be the contating element, however its highly advised for the logic to have its own formatting scheme as it could break the judima app

* test that with several duplicateGroups things can  work in tandem
	* works at a basic level root out the specific causes

	* when outside_duplicates >= 2 && inside_duplicates >  outside_duplicates , app doesnt break because inputHandleModifyName does not snap. it snapped because it was not looking at the current group it was looking at all groups

	*  when outside_duplicates === 0 && inside_duplicates >  outside_duplicates
	it should not break the app on desktop

	

## Ryber
*  make sure every element can  get css and attribute support as defined by options in objects
* consider changing from key to class and having classes support _ in its name
* every zChild.extras needs 
	* appNest directive,
	* component
	* type
	* extend
	* multipleGroup
	* judima
* no zChildren contain function with refrences to external data or data types that do such
* use zSymbolNeeded ="true" to indicate that a directive needs its own zChild symbol

### judima object
* indicates to the judima framework how to specifcally deal with this element
* make sure you use formatIgnore to indicate to judima

### cms

* all cms transformations should conform to the standards provided in cms/website*.ts
### button

* should more directives go on button, on  just more zChildren for different features
* try to abstract all required logic to the directive 
