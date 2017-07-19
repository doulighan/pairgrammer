ERB: https://www.lucidchart.com/documents/edit/28856cd9-ab45-4672-a8f4-637a796c7054#
WIREFRAME: https://www.fluidui.com/editor/live/


*********************************************************************************************************************************
USER STORIES
*********************************************************************************************************************************


-As a programmer, I want a way to work collaboratively while working remotely. I want to be able to edit the same file with multiple collaborators, and have all collaborators see the changes live.

-I sometimes want to collaborate and avoid the hassle of Git merges.

-Sometimes teams work better when they are solving the same problem side-by-side. I want software to have a tool for this remotely. 

-I want to be able to effectively communicate with collaborators, either through text or audio chat. 

-I want to know who has changed what parts of the document, as well as sometimes restrict the editing of a document for other collaborators.


*********************************************************************************************************************************
DELIVERABLES:
*********************************************************************************************************************************

	MVP: 

ROOT
-A homepage requests the user to enter a name. There is no login, this will simply be his alias for the session.

HOME
-The user can then create a new file, or pick from a list of files currently open by other users.
-Each file will create a socket room under its name
-Editor will then open with selected file, user will be put in room.

EDITOR
-All users can see who is currently in the room. All users will see their editor update live as the other users change the text.
-There will be a chat bar for all users in a room
-Users can leave rooms and join others

—————————————————————————————————————————————————————————————————

	GOALS:

ROOT
-A homepage allows a user to login or sign up. Users will be added to the database, simple password protection

HOME
-A user can choose to open a file from a list of files he has previously created, or previously been invited to. 
-A user can create a new file
  - New files will lead to a files show page
	- Can specify the language the file will be written in
	- Can choose if the file is private or public
		-for private files, the creator can invite collaborators by searching and selecting from usernames in the database

EDITOR
-Will have syntax highlighting
-Will have the ability to save/load file to database, along with data about its collaborators
-Will be able to view chat history, saved temporarily by socket server (last 10 messages maybe?)

—————————————————————————————————————————————————————————————————

	STRETCH:
- Changing themes on the editor
- Saves data about past edits, like commits
- Save multiple files as part of a project structure
- Friends list index and show pages 
- Voice communications
- Allowing and blocking editing by file creator


*********************************************************************************************************************************
COMPONENTS & STATE:
*********************************************************************************************************************************

MVP:
  <App>
      <TitleContainer>
      <LoginAlias>
         <Nav>
         <UserHome>
            <CurrentlyOpenFilesList>
            <NewFileForm>
                <EditorContainer>
                  <Nav>
                  <CodeMirrorContainer>
                       <CodeMirror>
                
GOALs:

<App>
    <TitleContainer>
    <Splash (login&signup)>
        <LoginForm> || <SignupForm>
        
            <Nav>
            <FriendsBar>
            <UserHome>
                <OpenSidebar>
                    <FileList>
                <NewFileForm>
            
                        <EditorContainer>
                          <Nav>
                          <ChatBar>
                          <InfoBox>
                          <CodeMirrorContainer>
                              <CodeMirror>
                              
                              
                              

             
      
      




