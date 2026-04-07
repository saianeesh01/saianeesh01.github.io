const fs = require('fs');

const file = fs.readFileSync('./model.glb');
const jsonLength = file.readUInt32LE(12);
const jsonChunk = file.slice(20, 20 + jsonLength);
const json = JSON.parse(jsonChunk.toString('utf8'));

const out = [];
out.push(`FILE SIZE: ${(file.length / 1024 / 1024).toFixed(2)} MB`);
out.push(`NODES: ${json.nodes?.length || 0}`);
out.push(`MESHES: ${json.meshes?.length || 0}`);
out.push(`ANIMATIONS: ${json.animations?.length || 0}`);
out.push(`SKINS: ${json.skins?.length || 0}`);

out.push('\n--- NODE NAMES ---');
json.nodes?.forEach((n, i) => {
    const tags = [];
    if (n.mesh !== undefined) tags.push('M');
    if (n.skin !== undefined) tags.push('S');
    out.push(`${i}: ${n.name || '?'} ${tags.join(',')}`);
});

out.push('\n--- MESH NAMES ---');
json.meshes?.forEach((m, i) => out.push(`${i}: ${m.name || '?'}`));

out.push('\n--- ANIMATION NAMES ---');
json.animations?.forEach((a, i) => out.push(`${i}: ${a.name || '?'}`));

out.push('\n--- JOINT NAMES (first skin) ---');
if (json.skins?.[0]?.joints) {
    json.skins[0].joints.forEach(j => out.push(json.nodes[j]?.name || '?'));
}

fs.writeFileSync('./model_info.json', JSON.stringify({
    nodeNames: json.nodes?.map(n => n.name) || [],
    meshNames: json.meshes?.map(m => m.name) || [],
    animationNames: json.animations?.map(a => a.name) || [],
    jointNames: json.skins?.[0]?.joints?.map(j => json.nodes[j]?.name) || [],
}, null, 2));

console.log(out.join('\n'));
