<h1 align="center">📋 Project Setup Instructions</h1>

<h2>Pre-requisites</h2>
<ul>
  <li>You must have <b>Node.js</b> installed on your PC. Install from 
    <a href="https://nodejs.org/en/download/prebuilt-installer/current" target="_blank">here</a>.
  </li>
  <li>You must have <b>Git</b> installed on your PC. Install from 
    <a href="https://git-scm.com/downloads" target="_blank">here</a>.
  </li>
</ul>

<h2>📦 Clone the Repository</h2>
<ol>
  <li>Copy the HTTPS link of the repository.</li>
  <li>Go to the folder where you want to clone the repository.</li>
  <li>Open the Command Prompt (CMD) in that folder.</li>
  <li>Run the following command in your terminal:
    <pre><code>git clone [repository_url]</code></pre>
  </li>
</ol>

<h2>⚙️ Instructions to Start the Backend</h2>
<ol>
  <li>Navigate to the <b>backend</b> folder.</li>
  <li>Run <code>npm install</code> to install backend dependencies.</li>
  <li>Create a <code>.env</code> file in the root of the backend folder.</li>
  <li>Your <code>.env</code> file should look like this:
    <pre><code>
JWT_SECRET=snsjfdjsdhfjkahkfs*********82dhsjh9823rhjdw
DATABASE_URL=mongodb+srv://**************:********@cluster0.efzjjpk.mongodb.net/?retryWrites=true&w=majority
    </code></pre>
  </li>
  <li>After creating the <code>.env</code> file, run the following command to start the backend:
    <pre><code>npm run dev</code></pre>
  </li>
</ol>
<p><b>Congratulations!</b> Your backend is now running.</p>

<h2>🎨 Instructions to Start the Frontend</h2>
<ol>
  <li>Navigate to the <b>frontend</b> folder.</li>
  <li>Run <code>npm install</code> to install frontend dependencies.</li>
  <li>Run the following command to start the frontend:
    <pre><code>npm run dev</code></pre>
  </li>
</ol>
<p><b>Congratulations!</b> Your project is now live!</p>
