import { giveUserPoint } from '../../functions/pointFunctions.js';
import ModalComponent from '../../base/ModalComponent.js';
export default new ModalComponent({
    data: {
        name: 'pointModal',
    },
    async execute(interaction) {
        const pointInputData = parseInt(interaction.fields.getTextInputValue('pointInput'));
        const userIdData = interaction.fields.getTextInputValue('userIdInput');
        giveUserPoint(userIdData, pointInputData);
        await interaction.reply(`${client.users.cache.get(userIdData)?.username || 'NO USER'}に${pointInputData}ポイントを付与しました。`);
    },
});
