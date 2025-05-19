import { useWallet } from '../arcgis/hooks/useWallet';
import { useCoin } from '../contracts/useCoin';

export default function CreateProposal() {
  const { userAddress, connect } = useWallet()
  const { mintProposal } = useCoin()
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (!name) return alert('Enter proposal name!')
    const symbol = `$${name.replace(/\s+/g, '').toUpperCase()}`
    mintProposal(name, symbol)
  }

  return (
    <div>
      <h1>Create Urban Proposal</h1>
      {!userAddress ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <input 
            placeholder="Bike Path" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit}>
            Mint Proposal as Token
          </button>
        </>
      )}
    </div>
  )
}