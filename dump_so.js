rpc.exports = {
    findmodule: function(so_name) {
        var libso = Process.findModuleByName(so_name);
        return libso;
    },
    dumpmodule: function(so_name) {
        var libso = Process.findModuleByName(so_name);
        if (libso == null) {
            return -1;
        }
        Memory.protect(ptr(libso.base), libso.size, 'rwx');
        var libso_buffer = ptr(libso.base).readByteArray(libso.size);
        libso.buffer = libso_buffer;
        if(libso.size > 128 * 1024 * 1024) {
            // var ActivityThread = Java.use("android.app.ActivityThread");
            // var dir = ActivityThread.currentApplication().getApplicationContext().getFilesDir().getAbsolutePath()
            var dir = '/sdcard/Download'
            var path = dir + '/' + so_name

            if(libso_buffer != null) {
                var file = new File(path, 'w')
                file.write(libso_buffer)
                return path
            }
        } else {
            return libso_buffer;
        }

        return -1
    },
    allmodule: function() {
        return Process.enumerateModules()
    },
    arch: function() {
        return Process.arch;
    }
}