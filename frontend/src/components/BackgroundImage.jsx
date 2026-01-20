const BackgroundImage = () => (
    <div className="fixed inset-0 z-[-1]">
        <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
            alt="Agriculture Background"
            className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    </div>
)

export default BackgroundImage
