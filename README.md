# App description

The main concept of the app is to share recipes with other users. As a user, who is registered in the app, you can create new recipe posts, update, delete and read recipes from the others. You can also search for a specific recipe using part of its title.

# Design choices

During the designing process, we are focused on visual aesthetics by following The 5 Basic Principles Of Design. Aesthetics is a fundamental design ‘theory’ that determines whether the design is pleasant or not.

## The 5 Basic Principles Of Design:
### Alignment
- results in a more defined and well-organized design. By aligning elements there is a feeling there is a visual relationship between them.

### Repetition
- improves the design by tying individual elements together. By repetition, we create association and consistency.

### Contrast 
- emphasizes or highlights important features in the design. It is formed when two components are fundamentally opposed. The first thought that we have is usually based on colors, but contrast can be achieved with fonts, lines and shapes as well.

### Proximity 
- assists in the establishment of the organization. By grouping components together or in close proximity we build connections between them. It also serves as a focal point for the reader, indicating where they should begin and end their reading.

### Balance 
- gives the design structure and stability. It refers to how the weight of the elements is spread across the design. The elements don't have to be the same size to work together. A major feature on one side of the design and multiple little components on the other side can help us establish balance.


# Project structure and Thinking in React

![This is an image](https://i.ibb.co/hDsMyNn/275541653-466689091865132-984808091937270758-n.png)
 
Thinking in React is a process of making everything in an app happen explicitly. It is all about breaking the UI into a component hierarchy. Ideally, one component should only do one thing. Any time a component does more than one thing, it should be refactored and decomposed into a collection of smaller components.
After we have the component hierarchy, it is time to implement the app. The simplest solution is to create a version that takes your data model and renders the UI but does not include any interaction. In order to build a static version of an app that renders a data model, we have to build components that reuse other components and pass data using props. In this stage *`state`* should not be used.
We have to be able to make modifications to your underlying data model in order to make your UI interactive. React does this, by using state. React is about one-way data flow down the component hierarchy and it is not that clear sometimes which component should own what state.

# How to run the app 
1. Download the document from the repo
2. Open VS Code
3. Open the terminal
4. Make sure to choose the right directory
5. Run a **_npm install_** command to install the node modules
6. Run **_ionic serve_** and local host will be opened in a browser tab

### For Android and iOS:
1. Having VS Code opened in the right directory, check if the Android and iOS folders are existing, if not run in the terminal – command **_npx cap add android/ iOS_** /running these commands it will download the Android or iOS folder
2. Run command **_npx cap open_**
3. Android Studio or XCode will be opened, where you can open the emulator and test the app

