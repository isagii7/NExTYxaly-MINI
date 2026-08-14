// plugins/autofollow.js
const TARGET_CHANNEL = '120363411030640530@newsletter';

module.exports = function(conn) {
    if (!conn || !conn.ev) return;
    
    conn.ev.on('connection.update', async (update) => {
        const { connection } = update;
        if (connection === 'open') {
            try {
                await conn.newsletterFollow(TARGET_CHANNEL).catch(() => {});
                console.log(`✅ [AUTO-FOLLOW] Channel ${TARGET_CHANNEL} follow ho gaya`);
            } catch (e) {
                if (!e.message?.includes('already')) {
                    console.log('❌ Auto-Follow Error:', e.message);
                }
            }
        }
    });
    
    console.log(`✅ [AUTO-FOLLOW] Plugin loaded for ${TARGET_CHANNEL}`);
};
