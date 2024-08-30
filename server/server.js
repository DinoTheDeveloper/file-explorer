const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/directory', async (req, res) => {
    try {
        let directoryPath = req.query.path || os.homedir();
        if (directoryPath === '/') {
            directoryPath = os.homedir();
        }

        const files = await fs.readdir(directoryPath);

        const filePromises = files.map(async (file) => {
            const fullPath = path.join(directoryPath, file);
            try {
                const stats = await fs.stat(fullPath);
                return {
                    filename: file,
                    fullPath: fullPath,
                    size: stats.size,
                    extension: path.extname(file),
                    createdDate: stats.birthtime,
                    isDirectory: stats.isDirectory(),
                    permissions: stats.mode.toString(8).slice(-3)
                };
            } catch (error) {
                console.error(`Error reading file ${fullPath}:`, error);
                return null;
            }
        });

        const fileDetails = (await Promise.all(filePromises)).filter(file => file !== null);
        res.json(fileDetails);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});