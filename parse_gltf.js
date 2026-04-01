const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/models/web_diagram_copy.gltf', 'utf8'));

console.log("Nodes:");
if (data.nodes) {
    data.nodes.forEach((n, i) => {
        if (n.mesh !== undefined) {
             console.log(`Node ${i}: ${n.name || 'Unnamed'} (Mesh ${n.mesh})`);
        }
    });
} else {
    console.log("No nodes found.");
}
