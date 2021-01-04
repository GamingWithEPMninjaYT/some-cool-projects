
const electronInstaller = require("electron-winstaller")

try {
    electronInstaller.createWindowsInstaller({
      appDirectory: 'C:/Users/Aman/Desktop/ZTracker/ztracker-win32-x64',
      outputDirectory: 'C:/Users/Aman/Desktop/ZTracker/ztracker-installers',
      authors: 'ZedRoff',
      exe: 'ztracker.exe',
      description: "A cool tracker for OOT Randomizer."
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
