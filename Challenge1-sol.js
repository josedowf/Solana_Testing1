// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");


const airDropSol = async ( publicKey ) => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to user public wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

var args = process.argv.slice(2);

// Checks if argument has been specified in the command line
if ( args.length > 0 ) {
    try{
        const userPublicKey = args[0];
        console.log(`Users public key: ${userPublicKey}`);
        airDropSol(userPublicKey).then(() => {
            console.log(`User ${userPublicKey} has been credited 2 SOL on their account!`);
        });
    }catch(e) {
        console.log(e);
    }
} else {
    console.log('Please enter receivers address (i.e. their public key) using the terminal (example:npm start <public key>)')
}