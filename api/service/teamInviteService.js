import nonceGenerator from '@rdcl/nonce';
import config from '../config/app';

const generateToken = () => {
    return nonceGenerator(config.teamInvites.nonceLength);
};

class TeamInviteService {
    async create(_, {input}, {wetland, token}) {
        try {
            const manager   = wetland.getManager();
            const populator = wetland.getPopulator(manager);

            const TeamInvite = manager.getEntity('TeamInvite');

            const nonce = await generateToken();

            const teamInvite = populator.assign(TeamInvite, {
                token    : nonce,
                expiresIn: -1,
                user     : token.user.id,
                ...input,
            });

            await manager.persist(teamInvite).flush();

            return {teamInvite};
        }
        catch (error) {
            throw error;
        }
    }
}

export default new TeamInviteService;
