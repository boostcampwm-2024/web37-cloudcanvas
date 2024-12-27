import Graph from '@/components/Graph';
import GridBackground from '@/components/GridBackground';

function App() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Graph>
                <GridBackground />
            </Graph>
        </div>
    );
}

export default App;
