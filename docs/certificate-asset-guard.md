# Certificate asset guard

The public site may show reviewed conformity metadata as text. Keep original certificates, scans, signatures, seals, QR codes and private verification records outside the repository and build inputs. Never add them to the public asset allowlist.

The initial allowlist pins all 39 assets from main at `a13607f` by relative path and SHA-256. It includes the site icons, Legends General logo, existing project photography, catalog illustrations and partner logos. Existing photography and illustrative product imagery are documented in [Content sources](content-sources.md). The initial review matched the rendered inventory to these categories. The allowlist contains image assets only. Git preserves their exact bytes across platforms.

For any new or changed image, review the source and the full image at readable size. Confirm that Legends has authorized its use and inspect the image and its metadata for certificates, document fragments, seals, signatures, QR codes and private details. Record where it came from and the result of the review with the change. Then add or update that specific path and SHA-256 in [the allowlist](../scripts/approved-public-assets.json). Reviewers should verify the asset and the digest together.

Run the checks from the repository root.

```sh
node scripts/check-certificate-assets.mjs repo
node --test scripts/check-certificate-assets.test.mjs
npm run build
node scripts/check-certificate-assets.mjs export
```

The repository check inspects each tracked file in the working tree and its Git index blob, including staged bytes that differ from the working tree. In CI the clean checkout represents the commit being checked. It rejects document and archive signatures and unapproved binary content, and checks both the indexed public assets and the entire working public tree against the allowlist. The export check requires `out/index.html`, the approved assets and matching Next build files for generated HTML, route data, CSS and JavaScript. The Pages workflow checks the exact tree it uploads.

The automated checks identify common file signatures, unexpected paths and changed bytes. A human still needs to review images and source changes for sensitive text, visual details and links. Keep this guard in place on pull requests and before upload, and run the source check locally before sharing a change. A check on GitHub runs after a commit has reached GitHub.
