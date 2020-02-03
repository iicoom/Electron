const Store = require('electron-store');
const uuidv4 = require('uuid/v4')
const path = require('path')

class DataStore extends Store {
    constructor(settings) {
        super(settings)
        this.tracks = this.get('tracks') || []
    }
    saveTracks() {
        this.set('tracks', this.tracks)
        return this
    }
    getTracks() {
        return this.get('tracks') || []
    }
    addTracks(tracks) {
        const currentTrackPath = this.getTracks().map(item => item.path)
        const willAddTracks = tracks.map(track => {
            return {
                id: uuidv4(),
                path: track,
                fileName: path.basename(track)
            }
        }).filter(item => !currentTrackPath.includes(item.path))
        this.tracks = [...this.tracks, ...willAddTracks]
        return this.saveTracks()
    }
    removeTracks(trackId) {
        this.tracks = this.tracks.filter(item => item.id !== trackId)
        return this.saveTracks()
    }
}

module.exports = DataStore