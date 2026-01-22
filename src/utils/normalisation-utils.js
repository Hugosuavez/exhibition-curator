import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";


export const normaliseArtwork = (artwork) => {
    const imageUrl =
        artwork.primaryImage ||
        artwork.primaryImageSmall ||
        artwork.primaryimageurl ||
        NoImagePlaceholder;

    const regex = /^\[.*\]$/;

    const title = artwork.title
        ? regex.test(artwork.title)
            ? artwork.title.slice(1, -1)
            : artwork.title
        : "Untitled";

    const normalisedArtwork = {
        id: artwork.objectID || artwork.objectid,
        title: title,
        imageUrl: imageUrl,
        artist:
            artwork.artistDisplayName || artwork.provenance || "Unknown",
        department: artwork.department || "Not specified",
        culture: artwork.culture || "Not specified",
        objectDate:
            artwork.objectDate || artwork.century || "Not specified",
        medium: artwork.medium || "Not specified",
        dimensions: artwork.dimensions || "Not specified",
        creditLine:
            artwork.creditLine || artwork.creditline || "Not available",
        description: artwork.description || "No description provided",
        moreInfoURL: artwork.objectURL || artwork.url || null,
        source: artwork.objectID ? "The Met" : "Harvard Art Museums",
    };

    return normalisedArtwork;
}