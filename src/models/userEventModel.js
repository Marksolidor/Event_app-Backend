const pool = require('../database/db');

const userEvent = async (payload) => {
 //console.log("test", id_usuario, id_evento)
    try {
        const { rows } = await pool.query(
        'INSERT INTO user_event (id_usuario, id_evento) VALUES ($1, $2) RETURNING *',
        [payload.id_usuario, payload.id_evento],
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
};

const removeUserEvent = async (id) => {
    try {
        const { rows } = await pool.query(
        'DELETE FROM user_event WHERE id = $1',
        [id],
        );
        return rows[0];
    } catch (err) {
        console.log(err);
    }
};

    module.exports = { userEvent, removeUserEvent };